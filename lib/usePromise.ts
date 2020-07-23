import { ref, UnwrapRef } from 'vue'

export default function <T> (defaultValue: T, promise: Promise<T>) {
  const val = ref(defaultValue)

  promise.then((value) => {
    val.value = value as UnwrapRef<T>
  })

  return val
}
