"use client"

import { useState } from "react"

type Organization = {
  id: string
  name: string
  model: string
  hateCategories: string[]
}

const initialOrganizations: Organization[] = [
  { id: "1", name: "Tech for Good", model: "gpt-3.5-turbo", hateCategories: ["race", "gender"] },
  { id: "2", name: "AI Ethics Group", model: "gpt-4", hateCategories: ["religion", "nationality"] },
]

const hateCategories = [
  "race",
  "gender",
  "religion",
  "nationality",
  "sexual orientation",
  "disability",
]

export default function OrganizationDashboard() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations)
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false)
  const [newOrg, setNewOrg] = useState<Omit<Organization, "id">>({
    name: "",
    model: "",
    hateCategories: [],
  })

  const handleCreateOrg = () => {
    if (newOrg.name && newOrg.model && newOrg.hateCategories.length > 0) {
      const createdOrg: Organization = {
        ...newOrg,
        id: (organizations.length + 1).toString(),
      }
      setOrganizations([...organizations, createdOrg])
      setIsCreateOrgOpen(false)
      setNewOrg({ name: "", model: "", hateCategories: [] })
      alert(`${newOrg.name} has been created successfully.`)
    } else {
      alert("Please fill in all fields and select at least one hate category.")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Organization Dashboard</h1>

      <div className="mb-8">
        <button
          onClick={() => setIsCreateOrgOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-7-7h14" />
          </svg>
          <span>Create New Organization</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <h2 className="text-xl font-bold">{org.name}</h2>
              <p className="text-gray-600">Model: {org.model}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">Hate Categories:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {org.hateCategories.map((category) => (
                  <span key={category} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isCreateOrgOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Organization</h2>
            <p className="text-gray-600 mb-4">
              Set up a new organization and configure its AI model for hate speech detection.
            </p>
            <div className="mb-4">
              <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">
                Organization Name
              </label>
              <input
                id="org-name"
                value={newOrg.name}
                onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="model-name" className="block text-sm font-medium text-gray-700">
                Model Name
              </label>
              <input
                id="model-name"
                value={newOrg.model}
                onChange={(e) => setNewOrg({ ...newOrg, model: e.target.value })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hate Categories
              </label>
              {hateCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <input
                    id={category}
                    type="checkbox"
                    checked={newOrg.hateCategories.includes(category)}
                    onChange={(e) => {
                      const checked = e.target.checked
                      setNewOrg({
                        ...newOrg,
                        hateCategories: checked
                          ? [...newOrg.hateCategories, category]
                          : newOrg.hateCategories.filter((c) => c !== category),
                      })
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor={category} className="text-sm text-gray-600">
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsCreateOrgOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrg}
                className="bg-blue-600 text-white py-2 px-4 rounded"
              >
                Create Organization
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
