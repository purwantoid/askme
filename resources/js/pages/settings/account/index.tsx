import { SettingLayout } from '@/layouts'
import ContentSection from '../components/content-section'
import { AccountForm } from './account-form'

export default function SettingsAccount() {
  return (
    <>
      <SettingLayout title='Account Settings'>
        <ContentSection
          title='Account'
          desc='Update your account settings. Set your preferred language and
              timezone.'
        >
          <AccountForm />
        </ContentSection>
      </SettingLayout>
    </>
  )
}
