import { useCallback, useEffect, useState } from "react"

export function useQueryParamTab(paramName = "tab", defaultValue: string) {
    const getParam = () => new URLSearchParams(window.location.search).get(paramName) ?? defaultValue

    const [value, setValue] = useState(getParam)

    // keep in sync with browser back/forward
    useEffect(() => {
        const onPopState = () => setValue(getParam())
        window.addEventListener("popstate", onPopState)
        return () => window.removeEventListener("popstate", onPopState)
    }, [])

    const setTab = useCallback(
        (newValue: string) => {
            setValue(newValue)
            const params = new URLSearchParams(window.location.search)
            params.set(paramName, newValue)
            const newUrl = `${window.location.pathname}?${params.toString()}`
            window.history.pushState({}, "", newUrl)
        },
        [paramName],
    )

    return [value, setTab] as const
}
