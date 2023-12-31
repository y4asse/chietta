import { User } from '@prisma/client'
import { FaXTwitter, FaGithub, FaPaperclip } from 'react-icons/fa6'
import Zenn from '../icons/Zenn'
import Note from '../icons/Note'
import Qiita from '../icons/Qiita'
import Hatena from '../icons/Hatena'

const SnsList = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center md:justify-end gap-5 mt-5 text-2xl">
      {user.x && (
        <a target="_blank" href={`https://x.com/${user.x}`}>
          <FaXTwitter />
        </a>
      )}
      {user.github && (
        <a target="_blank" href={`https://github.com/${user.github}`}>
          <FaGithub />
        </a>
      )}
      {user.zenn && (
        <a target="_blank" href={`https://zenn.dev/${user.zenn}`}>
          <Zenn />
        </a>
      )}
      {user.qiita && (
        <a target="_blank" href={`https://qiita.com/${user.qiita}`}>
          <Qiita />
        </a>
      )}
      {user.note && (
        <a target="_blank" href={`https://note.com/${user.note}`}>
          <Note />
        </a>
      )}
      {user.hatena && (
        <a target="_blank" href={`https://${user.hatena}.hatenablog.com`}>
          <Hatena />
        </a>
      )}
      {user.webSite && (
        <a target="_blank" href={user.webSite}>
          <FaPaperclip />
        </a>
      )}
    </div>
  )
}

export default SnsList
