import { useEffect, useState, useRef } from 'react'
import { projectFirestore } from '../firebase/config'

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  // if we don't use a useRef hook then this will cause an infinite loop since react
  // detects arrays (_query, _orderBy) as a "different item" on every function call so will keep calling
  // use .current to get the value
  const query = useRef(_query).current
  const orderBy = useRef(_orderBy).current

  useEffect(() => {
    // reference to the collection from firestore
    let ref = projectFirestore.collection(collection)

    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }

    const unsubscribe = ref.onSnapshot((snapshot) => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id })
        })
    
    // update state
    setDocuments(results)
    setError(null)
    }, error => { // if encounter error
      console.log(error)
      setError('could not fetch the data')
    })

    // unsubscribe so we won't fetch data once unmounted
    return () => unsubscribe()

  }, [collection, query, orderBy])

  return { documents, error }
}