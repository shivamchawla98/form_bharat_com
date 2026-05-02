'use client'

import { useState, useEffect, useRef, Fragment } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragCancelEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { FormField, FieldType } from '@/lib/types'
import { shouldShowField } from '@/lib/conditional-logic'
import { SortableField } from './SortableField'
import { FieldTypeSelector, ALL_FIELD_TYPES } from './FieldTypeSelector'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Save, Eye, Plus, FileText, ChevronLeft,
  LayoutGrid, Home, HelpCircle, BookTemplate, MapPin,
} from 'lucide-react'
import Link from 'next/link'
import { BuilderTour } from '@/components/BuilderTour'
import { Logo } from '@/components/Logo'

// ─── helpers ────────────────────────────────────────────────────────────────

function createNewField(type: FieldType): FormField {
  const defaultLabels: Partial<Record<FieldType, string>> = {
    section: 'Section Title',
    heading: 'Heading Text',
    image: '',
  }
  return {
    id: nanoid(),
    type,
    label: defaultLabels[type] ?? `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
    placeholder: '',
    required: false,
    options: ['dropdown', 'radio', 'checkbox'].includes(type) ? ['Option 1', 'Option 2'] : undefined,
  }
}

// ─── sub-components ──────────────────────────────────────────────────────────

function InsertionIndicator() {
  return (
    <div className="flex items-center pointer-events-none py-0.5 animate-in fade-in duration-100">
      <div className="w-3 h-3 rounded-full border-2 border-orange-500 bg-white flex-shrink-0 -mr-px" />
      <div className="h-0.5 flex-1 bg-orange-500 rounded-full" />
    </div>
  )
}

function CanvasDropArea({ children, isDraggingNew }: { children: React.ReactNode; isDraggingNew: boolean }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' })
  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl transition-all duration-150 ${
        isDraggingNew && isOver ? 'ring-2 ring-orange-400 ring-offset-2' : ''
      }`}
    >
      {children}
    </div>
  )
}

function renderPreviewField(field: FormField) {
  switch (field.type) {
    case 'section':
      return (
        <div className="border-t-2 border-gray-200 pt-5 mt-2">
          {field.label && <h3 className="text-base font-semibold text-gray-800">{field.label}</h3>}
          {field.description && <p className="text-sm text-gray-500 mt-1">{field.description}</p>}
        </div>
      )
    case 'heading':
      return (
        <div className="py-1">
          {field.label && <p className="text-base font-semibold text-gray-800">{field.label}</p>}
          {field.description && <p className="text-sm text-gray-500 mt-1">{field.description}</p>}
        </div>
      )
    case 'image':
      return (
        <div className="space-y-1">
          {field.placeholder
            ? <img src={field.placeholder} alt={field.label} className="max-w-full rounded-lg border border-gray-200" />
            : <div className="bg-gray-100 rounded-lg p-8 text-center text-sm text-gray-400">No image URL set</div>
          }
          {field.label && <p className="text-xs text-gray-400 text-center">{field.label}</p>}
        </div>
      )
    case 'textarea':
      return <textarea disabled placeholder={field.placeholder || ''} rows={3} className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm resize-none placeholder:text-gray-400" />
    case 'dropdown':
      return (
        <select disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-400">
          <option>Select an option</option>
          {field.options?.map((o, i) => <option key={i}>{o}</option>)}
        </select>
      )
    case 'radio':
      return (
        <div className="space-y-2">
          {field.options?.map((o, i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-not-allowed">
              <input type="radio" disabled className="h-4 w-4" /> {o}
            </label>
          ))}
        </div>
      )
    case 'checkbox':
      return (
        <div className="space-y-2">
          {field.options?.map((o, i) => (
            <label key={i} className="flex items-center gap-2 text-sm text-gray-700 cursor-not-allowed">
              <input type="checkbox" disabled className="h-4 w-4" /> {o}
            </label>
          ))}
        </div>
      )
    case 'file':
      return <input type="file" disabled className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm" />
    default:
      return <input
        type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'}
        disabled
        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
        className="w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-sm placeholder:text-gray-400"
      />
  }
}

// ─── main component ──────────────────────────────────────────────────────────

interface FormBuilderProps {
  initialTitle?: string
  initialDescription?: string
  initialFields?: FormField[]
  onSave?: (data: { title: string; description: string; fields: FormField[] }) => void
  isSaving?: boolean
  mode?: 'create' | 'edit'
}

export function FormBuilder({
  initialTitle = '',
  initialDescription = '',
  initialFields = [],
  onSave,
  isSaving = false,
  mode = 'create',
}: FormBuilderProps) {
  const [title, setTitle]           = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [fields, setFields]         = useState<FormField[]>(initialFields)
  const [showPreview, setShowPreview] = useState(false)
  const [tourActive, setTourActive] = useState(false)

  // drag-from-sidebar state
  const [draggedNewFieldType, setDraggedNewFieldType] = useState<FieldType | null>(null)
  const [insertAtIndex, setInsertAtIndex]             = useState(-1)
  const pointerYRef = useRef(0)

  // tour auto-trigger
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('fb-builder-tour-seen')) {
      const t = setTimeout(() => setTourActive(true), 900)
      return () => clearTimeout(t)
    }
  }, [])

  const closeTour = () => {
    setTourActive(false)
    if (typeof window !== 'undefined') localStorage.setItem('fb-builder-tour-seen', '1')
  }

  // sync props → state (template loading)
  useEffect(() => {
    if (initialTitle)                             setTitle(initialTitle)
    if (initialDescription)                       setDescription(initialDescription)
    if (initialFields && initialFields.length > 0) setFields(initialFields)
  }, [initialTitle, initialDescription, initialFields])

  // track pointer Y for upper/lower half detection during drag
  useEffect(() => {
    const onMove = (e: PointerEvent) => { pointerYRef.current = e.clientY }
    document.addEventListener('pointermove', onMove)
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  // set grabbing cursor globally while dragging a new field
  useEffect(() => {
    if (draggedNewFieldType) {
      document.body.style.cursor = 'grabbing'
      return () => { document.body.style.cursor = '' }
    }
  }, [draggedNewFieldType])

  // ─── sensors ──────────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  // ─── field CRUD ───────────────────────────────────────────────────────────

  const addField = (type: FieldType) => {
    setFields(prev => [...prev, createNewField(type)])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const deleteField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id))
  }

  // ─── drag handlers ────────────────────────────────────────────────────────

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.isNew) {
      setDraggedNewFieldType(event.active.data.current.fieldType)
      setInsertAtIndex(fields.length) // default: append at end
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    if (!event.active.data.current?.isNew) return
    const { over } = event

    if (!over || over.id === 'canvas-droppable') {
      setInsertAtIndex(fields.length)
      return
    }

    const overIndex = fields.findIndex(f => f.id === over.id)
    if (overIndex === -1) return

    const rect = over.rect
    const midY = rect.top + rect.height / 2
    setInsertAtIndex(pointerYRef.current < midY ? overIndex : overIndex + 1)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.data.current?.isNew) {
      // new field from sidebar → insert at computed position
      if (over) {
        const type = active.data.current.fieldType as FieldType
        const idx  = Math.max(0, Math.min(insertAtIndex, fields.length))
        setFields(prev => {
          const next = [...prev]
          next.splice(idx, 0, createNewField(type))
          return next
        })
      }
      setDraggedNewFieldType(null)
      setInsertAtIndex(-1)
      return
    }

    // reorder existing field
    if (over && active.id !== over.id && over.id !== 'canvas-droppable') {
      setFields(prev => {
        const oldIndex = prev.findIndex(f => f.id === active.id)
        const newIndex = prev.findIndex(f => f.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return prev
        return arrayMove(prev, oldIndex, newIndex)
      })
    }
  }

  const handleDragCancel = (_event: DragCancelEvent) => {
    setDraggedNewFieldType(null)
    setInsertAtIndex(-1)
  }

  // ─── save ─────────────────────────────────────────────────────────────────

  const handleSave = () => {
    if (onSave && !isSaving) onSave({ title, description, fields })
  }

  // ─── render ───────────────────────────────────────────────────────────────

  const isDraggingNew = !!draggedNewFieldType

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 md:gap-4">
              <Logo href="/" size="md" />
              <div className="hidden md:flex items-center gap-2">
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-lg font-semibold text-gray-700">Form Builder</h1>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/"><Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><Home className="mr-2 h-4 w-4" />Home</Button></Link>
              <Link href="/templates"><Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><BookTemplate className="mr-2 h-4 w-4" />Templates</Button></Link>
              <Link href="/dashboard"><Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><LayoutGrid className="mr-2 h-4 w-4" />My Forms</Button></Link>
              <Link href="/help"><Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900"><HelpCircle className="mr-2 h-4 w-4" />Help</Button></Link>
            </nav>

            <div className="flex gap-2">
              <Button data-tour="preview-btn" variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                <Eye className="mr-0 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Preview</span>
              </Button>
              <Button
                data-tour="save-btn"
                onClick={handleSave}
                disabled={isSaving}
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60"
              >
                <Save className="mr-0 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{isSaving ? 'Saving…' : mode === 'edit' ? 'Update Form' : 'Save Form'}</span>
                <span className="sm:hidden">{isSaving ? '…' : 'Save'}</span>
              </Button>
            </div>
          </div>

          {/* Mobile nav */}
          <nav className="lg:hidden flex items-center gap-2 mt-3 pt-3 border-t overflow-x-auto">
            <Link href="/"><Button variant="ghost" size="sm" className="text-gray-600 flex-shrink-0"><Home className="mr-1 h-4 w-4" /><span className="text-xs">Home</span></Button></Link>
            <Link href="/templates"><Button variant="ghost" size="sm" className="text-gray-600 flex-shrink-0"><BookTemplate className="mr-1 h-4 w-4" /><span className="text-xs">Templates</span></Button></Link>
            <Link href="/dashboard"><Button variant="ghost" size="sm" className="text-gray-600 flex-shrink-0"><LayoutGrid className="mr-1 h-4 w-4" /><span className="text-xs">My Forms</span></Button></Link>
            <Link href="/help"><Button variant="ghost" size="sm" className="text-gray-600 flex-shrink-0"><HelpCircle className="mr-1 h-4 w-4" /><span className="text-xs">Help</span></Button></Link>
          </nav>
        </div>
      </header>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            {title && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
              </div>
            )}
            {fields.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No fields added yet</p>
            ) : (
              fields.filter(f => shouldShowField(f, fields, {})).map(field => (
                <div key={field.id}>
                  {!['section', 'heading', 'image'].includes(field.type) && (
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}
                  {renderPreviewField(field)}
                </div>
              ))
            )}
            {fields.some(f => !['section', 'heading', 'image'].includes(f.type)) && (
              <button disabled className="w-full py-2.5 rounded-lg bg-orange-500 text-white text-sm font-semibold opacity-70 cursor-not-allowed">
                Submit
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="text-gray-900 font-medium">Form Builder</span>
        </div>

        {/* ── DndContext wraps both sidebar + canvas ─────────────────────── */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">

            {/* ── Sidebar ─────────────────────────────────────────────────── */}
            <div className="lg:sticky lg:top-24 h-fit">
              <Card
                data-tour="add-fields"
                className="p-4 max-h-[calc(100vh-130px)] overflow-y-auto"
              >
                <h2 className="font-semibold mb-1 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-orange-500" />
                  Add Fields
                </h2>
                <p className="text-xs text-gray-400 mb-4">Click or drag into form</p>
                <FieldTypeSelector onSelectType={addField} />
              </Card>
            </div>

            {/* ── Canvas ──────────────────────────────────────────────────── */}
            <div className="space-y-6">

              {/* Form Details */}
              <Card data-tour="form-details" className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-semibold">Form Details</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">
                      Form Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g., Customer Feedback Form"
                      className="text-lg font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block text-gray-700">Description</label>
                    <Textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Add a description to help people understand your form…"
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </Card>

              {/* Form Fields */}
              <Card data-tour="form-canvas" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-500" />
                    <h2 className="text-lg font-semibold">Form Fields</h2>
                  </div>
                  <span className="text-sm text-gray-500">
                    {fields.length} field{fields.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <CanvasDropArea isDraggingNew={isDraggingNew}>
                  {fields.length === 0 ? (
                    /* Empty state — highlights when a field is being dragged over */
                    <div className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-150 ${
                      isDraggingNew
                        ? 'border-orange-400 bg-orange-50'
                        : 'border-gray-300'
                    }`}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors ${
                        isDraggingNew ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        <Plus className={`h-8 w-8 transition-colors ${isDraggingNew ? 'text-orange-500' : 'text-gray-400'}`} />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        {isDraggingNew ? 'Drop to add here' : 'No fields yet'}
                      </h3>
                      {!isDraggingNew && (
                        <p className="text-gray-500 text-sm mb-4">
                          Click a field in the sidebar, or drag it anywhere into this canvas
                        </p>
                      )}
                    </div>
                  ) : (
                    <SortableContext
                      items={fields.map(f => f.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {/* indicator before first field */}
                        {isDraggingNew && insertAtIndex === 0 && <InsertionIndicator />}

                        {fields.map((field, index) => (
                          <Fragment key={field.id}>
                            <SortableField
                              field={field}
                              allFields={fields}
                              onUpdate={updateField}
                              onDelete={deleteField}
                            />
                            {/* indicator after this field */}
                            {isDraggingNew && insertAtIndex === index + 1 && <InsertionIndicator />}
                          </Fragment>
                        ))}
                      </div>
                    </SortableContext>
                  )}
                </CanvasDropArea>
              </Card>

              {/* Quick Tips */}
              <Card className="p-4 bg-orange-50 border border-orange-100">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <span>💡</span>
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Drag fields from the sidebar directly into position</li>
                  <li>• Drag existing fields up or down to reorder them</li>
                  <li>• Mark important fields as required</li>
                  <li>• Add placeholder text to guide users</li>
                </ul>
              </Card>
            </div>
          </div>

          {/* ── Drag Overlay (floating preview while dragging from sidebar) ── */}
          <DragOverlay dropAnimation={null}>
            {draggedNewFieldType && (() => {
              const def = ALL_FIELD_TYPES.find(f => f.type === draggedNewFieldType)
              if (!def) return null
              const Icon = def.icon
              return (
                <div className="bg-white border-2 border-orange-400 rounded-xl px-3.5 py-2.5 shadow-2xl flex items-center gap-3 pointer-events-none">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 leading-tight">{def.label}</div>
                    <div className="text-xs text-orange-500 leading-tight">Drop to add field</div>
                  </div>
                </div>
              )
            })()}
          </DragOverlay>
        </DndContext>
      </div>

      <BuilderTour active={tourActive} onClose={closeTour} />

      {/* Floating tour trigger */}
      {!tourActive && (
        <button
          onClick={() => setTourActive(true)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-white border border-orange-200 shadow-lg rounded-full pl-3.5 pr-4 py-2.5 text-sm font-medium text-orange-500 hover:bg-orange-50 hover:shadow-xl transition-all duration-200 group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
          </span>
          <MapPin className="h-4 w-4" />
          <span>Take a tour</span>
        </button>
      )}
    </div>
  )
}
