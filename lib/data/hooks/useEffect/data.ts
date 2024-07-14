export const renderCount_1 = `import { Button } from '@/components/ui/button'
import { useEffect, useLayoutEffect, useState } from 'react'

import React from 'react'

function But(): React.ReactElement {
  const [counter, setCounter] = useState(0)
  const increment = () => setCounter((p) => p + 1)

  useEffect(() => {
    console.log(3, effect {counter})
    return () => {
      console.log(4, clear effect {counter})
    }
  }, [counter])

  // отслеживаем приблизительный момент рендера браузера
  useLayoutEffect(() => {
    console.log(2, before paint effect {counter})
  }, [counter])

  console.log(1, render {counter})

  return <Button onClick={increment}>increment {counter}</Button>
}

const Example = () => {
  const [showButton, setShowButton] = useState(true)
  return (
    <div className="flex gap-2">
      <Button onClick={() => setShowButton((s) => !s)}>toggle</Button>
      {showButton && <But />}
    </div>
  )
}

export default Example`

export const raceConditions_1 = `'use client'
import { FC, useEffect, useState } from 'react'
import { mainInstance } from '@/api'
import { IUser } from '@/types/user.types'
import UserPreview from './UserPreview'

import UserListItem from './User-item'

const UsersList: FC = () => {
  const [users, setUsers] = useState<IUser[]>()
  const [selectedUserId, setSelectedUserId] = useState(1)

  useEffect(() => {
    mainInstance
      .get<IUser[]>(/users)
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })
  }, [])

  return (
    <div className="">
      <div className=" flex flex-col gap-2 mt-3">
        <h3 className=" text-lg font-semibold text-blue-400">
          Борьба с гонками (race conditions)
        </h3>

        <div className="p-3 flex gap-5 h-[430px] border">
          <div className="">
            {users &&
              users.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  selected={selectedUserId === user.id}
                  onClick={() => setSelectedUserId(user.id)}
                />
              ))}
          </div>
          {selectedUserId && <UserPreview id={selectedUserId} />}
        </div>
      </div>
      
    </div>
  )
}

export default UsersList`

export const raceConditionsCleanFun = `import { mainInstance } from '@/api'
import { IUser, UserId } from '@/types/user.types'
import { ReactNode, useEffect, useState } from 'react'

const UserPreview = ({ id, message }: { id: UserId; message?: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    mainInstance
      .get<IUser>(/users/{id})
      .then((response) => {
        if (active) {
          setUser(response.data)
        }
      })
      .catch((error) => {
        if (active) {
          console.error('Error fetching user:', error)
          setError('Error fetching user')
        }
      })

    return () => {
      active = false
    }
  }, [id])

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return null
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

export default UserPreview`

export const raceConditionsUseRef = `import { mainInstance } from '@/api'
import { IUser, UserId } from '@/types/user.types'
import { ReactNode, useEffect, useRef, useState } from 'react'

const UserPreview = ({ id, message }: { id: UserId; message?: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null)

  const fetchingUserId = useRef<UserId>()

  useEffect(() => {
    fetchingUserId.current = id
    mainInstance
      .get<IUser>(/users/{id})
      .then((response) => {
        if (fetchingUserId.current === id) {
          setUser(response.data)
        }
      })
      .catch((error) => {
        console.error('Error fetching user:', error)
      })
  }, [id])

  if (!user) {
    return null
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

export default UserPreview`

export const raceConditionsAbortController = `import { mainInstance } from '@/api'
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
        const response = await mainInstance.get<IUser>(/users/{id}, {
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

export default UserPreview`
