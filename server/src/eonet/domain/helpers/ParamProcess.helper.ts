const paramProcess = (body: any, defaults ={}) => {

    if(Object.keys(body).length <= 0){
        return defaults;
    }
    
    const result : { [key: string]: any } = {}

    for (const [key, value] of Object.entries(body)) {
        if(value == null && defaults.hasOwnProperty(key)){
            result[key as any] = value;
        } else if(value != null){
            result[key as any] = value;
        }
    }

    return result;
};

export default paramProcess;