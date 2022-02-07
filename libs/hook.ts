import useSWRInfinite from 'swr/infinite'

export const usePagination=(url:String)=>{
    const getKey=(pageIndex,previousPage ) => {
        return `${url}&_page=${pageIndex+1}&_limit=4`;
      }
    const {data,error,mutate,size, setSize}=useSWRInfinite(getKey);
    const isReachingLimit = data && data[data.length-1].length<4;
    return{
        data,
        error,
        mutate,
        size,
        setSize,
    }
}