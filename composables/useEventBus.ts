import mitt from 'mitt'

type EventData = {
    'triggerLoading': {}
}

const emitter = mitt<EventData>()

export const useListen = emitter.on
export const useEvent = emitter.emit