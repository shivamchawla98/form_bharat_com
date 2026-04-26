import type { FormField } from './types'

/**
 * Returns true if the field should be visible given the current form answers.
 * Fields with no condition are always visible.
 */
export function shouldShowField(
  field: FormField,
  allFields: FormField[],
  formData: Record<string, any>
): boolean {
  const cond = field.condition
  if (!cond || !cond.fieldId) return true

  const triggerField = allFields.find((f) => f.id === cond.fieldId)
  if (!triggerField) return true

  const rawValue = formData[cond.fieldId]
  const answerStr = Array.isArray(rawValue)
    ? rawValue.join(', ')
    : String(rawValue ?? '')

  switch (cond.operator) {
    case 'equals':
      return answerStr === cond.value
    case 'not_equals':
      return answerStr !== cond.value
    case 'contains':
      return answerStr.toLowerCase().includes(cond.value.toLowerCase())
    case 'is_empty':
      return answerStr.trim() === ''
    case 'is_not_empty':
      return answerStr.trim() !== ''
    default:
      return true
  }
}
