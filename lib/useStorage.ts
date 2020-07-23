import { ref, computed, UnwrapRef, nextTick } from 'vue'

type UseStorageOptions<T> = {
  readonly?: boolean;
  defaultValue: T;
}

export default function <T> (key: string, options: UseStorageOptions<T>) {
  const val = ref(options.defaultValue)

  const value = localStorage.getItem(key)
  if (value !== null) {
    val.value = value as UnwrapRef<T>
  }

  return computed({
    get () {
      return val.value
    },
    set (value) {
      if (!options.readonly) {
        localStorage.setItem(key, value + '')
        val.value = value as UnwrapRef<T>
      } else {
        val.value = '' as UnwrapRef<T>
        nextTick(() => {
          val.value = localStorage.getItem(key) as UnwrapRef<T>
        })
        console.warn('try change readonly localStorage: ', key)
      }
    }
  })
}
