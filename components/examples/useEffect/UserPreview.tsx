import { mainInstance } from '@/api'
import { IUser, UserId } from '@/types/user.types'
import { ReactNode, useEffect, useState } from 'react'

const UserPreview = ({ id, message }: { id: UserId; message?: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    let active = true

    const fetchUser = async () => {
      try {
        const response = await mainInstance.get<IUser>(`/users/${id}`, {
          signal
        })
        if (active) {
          setUser(response.data)
        }
      } catch (error) {
        if (signal.aborted) {
          console.log('Fetch aborted')
        } else {
          console.error('Error fetching user:', error)
          setError('Error fetching user')
        }
      }
    }

    fetchUser()

    return () => {
      active = false
      controller.abort()
    }
  }, [id])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-[280px] h-[130px] px-5 py-3 rounded-lg border border-gray-300">
      <div>
        <div>
          {user.name}: {user.id}
        </div>
        <div>{user.email}</div>
      </div>
    </div>
  )
}

export default UserPreview
