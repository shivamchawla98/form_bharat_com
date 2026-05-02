'use client'

import { FieldType } from '@/lib/types'
import { useDraggable } from '@dnd-kit/core'
import {
  Type, Mail, Phone, AlignLeft, List, Circle, CheckSquare, Upload,
  SeparatorHorizontal, AlignCenter, Image as ImageIcon, IndianRupee, ShieldCheck, GripVertical,
} from 'lucide-react'

interface FieldTypeSelectorProps {
  onSelectType: (type: FieldType) => void
}

export const ALL_FIELD_TYPES: {
  type: FieldType
  label: string
  icon: any
  description: string
  category: 'input' | 'layout' | 'advanced'
}[] = [
  { type: 'text',      label: 'Text',               icon: Type,                description: 'Single line input',                     category: 'input'    },
  { type: 'email',     label: 'Email',              icon: Mail,                description: 'Email address',                        category: 'input'    },
  { type: 'phone',     label: 'Phone',              icon: Phone,               description: 'Phone number',                         category: 'input'    },
  { type: 'textarea',  label: 'Long Text',          icon: AlignLeft,           description: 'Multi-line input',                     category: 'input'    },
  { type: 'dropdown',  label: 'Dropdown',           icon: List,                description: 'Select from list',                     category: 'input'    },
  { type: 'radio',     label: 'Multiple Choice',    icon: Circle,              description: 'Pick one option',                      category: 'input'    },
  { type: 'checkbox',  label: 'Checkboxes',         icon: CheckSquare,         description: 'Pick many options',                    category: 'input'    },
  { type: 'file',      label: 'File Upload',        icon: Upload,              description: 'Upload files/images',                  category: 'input'    },
  { type: 'section',   label: 'Section Break',      icon: SeparatorHorizontal, description: 'Divider with title',                   category: 'layout'   },
  { type: 'heading',   label: 'Title & Description',icon: AlignCenter,         description: 'Add text block',                       category: 'layout'   },
  { type: 'image',     label: 'Image',              icon: ImageIcon,           description: 'Embed an image',                       category: 'layout'   },
  { type: 'payment',   label: 'Payment / UPI',      icon: IndianRupee,         description: 'Collect payment via Razorpay / UPI',   category: 'advanced' },
  { type: 'phone_otp', label: 'Phone OTP',          icon: ShieldCheck,         description: 'Verify Indian mobile via OTP (MSG91)', category: 'advanced' },
]

function DraggableFieldButton({ type, label, icon: Icon, description, onSelectType }: {
  type: FieldType
  label: string
  icon: any
  description: string
  onSelectType: (type: FieldType) => void
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `new-field-${type}`,
    data: { isNew: true, fieldType: type },
  })

  return (
    <button
      ref={setNodeRef}
      type="button"
      onClick={() => onSelectType(type)}
      {...attributes}
      {...listeners}
      className={`w-full text-left p-3 rounded-lg border transition-all group select-none touch-none ${
        isDragging
          ? 'opacity-40 border-orange-300 bg-orange-50 cursor-grabbing'
          : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50 cursor-grab active:cursor-grabbing'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition ${
          isDragging ? 'bg-orange-100' : 'bg-gray-100 group-hover:bg-orange-100'
        }`}>
          <Icon className={`h-4 w-4 transition ${isDragging ? 'text-orange-600' : 'text-gray-600 group-hover:text-orange-600'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900 leading-tight">{label}</div>
          <div className="text-xs text-gray-500 mt-0.5 leading-tight">{description}</div>
        </div>
        <GripVertical className="h-4 w-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 transition" />
      </div>
    </button>
  )
}

export function FieldTypeSelector({ onSelectType }: FieldTypeSelectorProps) {
  const inputFields   = ALL_FIELD_TYPES.filter(f => f.category === 'input')
  const layoutFields  = ALL_FIELD_TYPES.filter(f => f.category === 'layout')
  const advancedFields = ALL_FIELD_TYPES.filter(f => f.category === 'advanced')

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Input Fields</p>
        <div className="space-y-1.5">
          {inputFields.map(f => (
            <DraggableFieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Layout</p>
        <div className="space-y-1.5">
          {layoutFields.map(f => (
            <DraggableFieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Advanced</p>
        <div className="space-y-1.5">
          {advancedFields.map(f => (
            <DraggableFieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
    </div>
  )
}
