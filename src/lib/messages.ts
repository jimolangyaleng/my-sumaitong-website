import en from '@/messages/en.json'
import zh from '@/messages/zh.json'
import ja from '@/messages/ja.json'
import ko from '@/messages/ko.json'
import es from '@/messages/es.json'
import fr from '@/messages/fr.json'
import de from '@/messages/de.json'
import ru from '@/messages/ru.json'

export const messages: Record<string, any> = {
  en,
  zh,
  ja,
  ko,
  es,
  fr,
  de,
  ru,
}

export function getLangMessages(locale: string) {
  return messages[locale] || messages.en
}
