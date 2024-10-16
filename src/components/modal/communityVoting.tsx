import React, { useState, useEffect } from 'react'
import { Vote, ThumbsUp, ThumbsDown, AlertTriangle, CheckCircle } from 'lucide-react'

// Mock functions for fetching and voting submissions
const mockFetchSubmissions = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
  return [
    { id: '1', text: "This is an example of hate speech...", category: "Racial", votes: { up: 15, down: 3 } },
    { id: '2', text: "Another instance of offensive language...", category: "Gender-based", votes: { up: 10, down: 5 } },
    { id: '3', text: "A submission that might be considered hate speech...", category: "Religious", votes: { up: 8, down: 7 } },
  ]
}

const mockVote = async (id: number, voteType:string) => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  return { success: true }
}

export default function CommunityVoting() {
  const [submissions, setSubmissions] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(null)

  const fetchSubmissions = async () => {
    setIsLoading(true)
    setError("")
    try {
      const data = await mockFetchSubmissions()
      setSubmissions(data)
    } catch {
      setError('Failed to fetch submissions. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // const handleVote = async (id: number, voteType: string) => {
  //   try {
  //     const result = await mockVote(id, voteType)
  //     if (result.success) {
  //       setSubmissions(prevSubmissions => 
  //         prevSubmissions?.map(sub => 
  //           sub.id === id 
  //             ? { ...sub, votes: { ...sub.votes, [voteType]: sub.votes[voteType] + 1 } }
  //             : sub
  //         ) ?? null
  //       )
  //       setSuccess('Your vote has been recorded.')
  //     } else {
  //       setError('Failed to submit vote. Please try again.')
  //     }
  //   } catch {
  //     setError('An error occurred while voting. Please try again.')
  //   }
  // }

  // useEffect(() => {
  //   fetchSubmissions()
  // }, [])

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {/* <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Vote className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-semibold">Community Voting</span>
        </div>
        <p className="text-gray-600 text-sm">
          Vote on submissions to help fine-tune our AI model and improve hate speech detection.
        </p>
      </div>

      <div className="p-4 space-y-4">
        {isLoading && <p className="text-center text-gray-500">Loading submissions...</p>}
        {error && (
          <div className="flex items-center bg-red-100 text-red-600 p-3 rounded-md">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="flex items-center bg-green-100 text-green-600 p-3 rounded-md">
            <CheckCircle className="h-4 w-4 mr-2" />
            <p>{success}</p>
          </div>
        )}

        {submissions && submissions.map((submission, index) => (
          <div key={submission.id} className="border rounded-md p-4 bg-gray-50">
            <div className="mb-2">
              <div className="text-lg font-medium">Submission {index + 1}</div>
              <div className="text-gray-500 text-sm">Category: {submission.category}</div>
            </div>
            <p className="text-gray-700 mb-4">{submission.text}</p>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  onClick={() => handleVote(submission.id, 'up')}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{submission.votes.up}</span>
                </button>
                <button
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                  onClick={() => handleVote(submission.id, 'down')}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span>{submission.votes.down}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Agreement:</span>
                <div className="w-24 bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(submission.votes.up / (submission.votes.up + submission.votes.down)) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <button
          onClick={fetchSubmissions}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Loading...' : 'Refresh Submissions'}
        </button>
      </div> */}
    </div>
  )
}
