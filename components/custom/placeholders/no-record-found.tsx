

interface NoRecordFoundProps {
    title?: string,
    description?:string
}
  
export default function NoRecordFound({ 
    title, description
 }: NoRecordFoundProps){
    return (
        <div className='flex flex-col text-center items-center justify-center p-5'>
            <span className='text-base'>
                {title ? title : "No Record Found"}
            </span>
            <span className='text-muted-foreground'>
                {description ? description : "Create a new one / clear filter."}
            </span>
        </div>
    )
}
