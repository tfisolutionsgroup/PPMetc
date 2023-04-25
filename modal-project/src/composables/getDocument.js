import { watchEffect, ref } from 'vue'
import { projectFirestore } from '../firebase/config'
//i also request for the id of one specific document
const getDocument = (collection, id) => {

  const document = ref(null)
  const error = ref(null)

  // register the firestore document by id reference
  let documentRef = projectFirestore.collection(collection).doc(id)


  const unsub = documentRef.onSnapshot( doc => {
    if(doc.data()){
        document.value = {...doc.data(), id: doc.id}
        error.value = null
    }else{
        error.value = 'that document does not exist'
    }
  }, err => {
    console.log(err.message)
    error.value = 'could not fetch the document'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, document}
}

export default getDocument