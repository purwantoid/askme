import { SettingLayout } from '@/layouts'
import ContentSection from '../components/content-section'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearance() {
  return (
    <SettingLayout title={"Appearance settings"}>
      <ContentSection
        title='Appearance'
        desc='Customize the appearance of the app. Automatically switch between day
            and night themes.'
      >
        <AppearanceForm />
      </ContentSection>
    </SettingLayout>
  )
}
