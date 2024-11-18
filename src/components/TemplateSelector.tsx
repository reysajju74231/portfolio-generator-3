import React from 'react';
import { Template } from '../types';
import { Check, ChevronDown } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelect: (templateId: Template['id']) => void;
}

export default function TemplateSelector({ templates, selectedTemplate, onSelect }: TemplateSelectorProps) {
  const categories = {
    minimal: templates.filter(t => t.category === 'minimal'),
    modern: templates.filter(t => t.category === 'modern'),
    creative: templates.filter(t => t.category === 'creative')
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(categories).map(([category, categoryTemplates]) => (
          <div key={category} className="space-y-4">
            <div className="relative">
              <select
                value={selectedTemplate}
                onChange={(e) => onSelect(e.target.value as Template['id'])}
                className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="" disabled>
                  Select {category.charAt(0).toUpperCase() + category.slice(1)} Template
                </option>
                {categoryTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none w-5 h-5" />
            </div>
            
            {categoryTemplates.map((template) => (
              template.id === selectedTemplate && (
                <div key={template.id} className="relative rounded-lg overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full aspect-[16/10] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <p className="text-sm opacity-90">{template.description}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}