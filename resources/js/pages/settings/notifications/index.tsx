import { SettingLayout } from "@/layouts"
import ContentSection from '../components/content-section'
import { NotificationsForm } from './notifications-form'

export default function SettingsNotifications() {
  return (
      <SettingLayout title={"Notifications Settings"}>
        <ContentSection
          title='Notifications'
          desc='Configure how you receive notifications.'
        >
          <NotificationsForm />
        </ContentSection>
      </SettingLayout>
  )
}
