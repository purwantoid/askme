import { SettingLayout } from "@/layouts"
import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'

export default function SettingsProfile() {
  return (
      <SettingLayout title={"User profile"}>
        <ContentSection
          title='Profile'
          desc='This is how others will see you on the site.'
        >
          <ProfileForm />
        </ContentSection>
      </SettingLayout>
  )
}
