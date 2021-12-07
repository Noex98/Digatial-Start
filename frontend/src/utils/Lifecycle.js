let didMounts = []
let willUnmounts = []

// Set lifecycle hooks
export function componentDidMount(func){
    didMounts.push(func)
}

export function componentWillUnmount(func){
    willUnmounts.push(func)
}


// Export handlers for router
export function handleWillUnmount(){
    if (willUnmounts.length > 0){
        for (const func of willUnmounts){
            func()
        }
        willUnmounts = []
    }
}

export function handleDidMount(){
    if (didMounts.length > 0){
        for (const func of didMounts){
            func()
        }
        didMounts = []
    }
}