import { MediaLibrary } from "@/components/admin/media-library"

export const revalidate = 0

export default function MediaLibraryPage() {
  return (
    <div className="p-6">
      <MediaLibrary />
    </div>
  )
}
