import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../shared/ui"
import { highlightText } from "../../utils"

type Props = {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  selectedPost: any
  searchQuery:any
}

export const PostDetailModal = ({ showPostDetailDialog, setShowPostDetailDialog, selectedPost, searchQuery }: Props) => {
  return (
         <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
           <DialogContent className="max-w-3xl">
             <DialogHeader>
               <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
             </DialogHeader>
             <div className="space-y-4">
               <p>{highlightText(selectedPost?.body, searchQuery)}</p>
               {renderComments(selectedPost?.id)}
             </div>
           </DialogContent>
         </Dialog>
  )
}