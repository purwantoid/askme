import {AuthenticatedLayout} from "@/layouts"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { Mail } from "@/pages/mail/components/mail"
import { accounts, mails } from "@/pages/mail/data"
import {Main} from '@/components/layout/main'

export default function MailPage() {

  const [defaultLayout, setDefaultLayout] = useState<number[] | undefined>();
  const [defaultCollapsed, setDefaultCollapsed] = useState<boolean | undefined>();

  useEffect(() => {
    const layout = Cookies.get("react-resizable-panels:layout:mail");
    const collapsed = Cookies.get("react-resizable-panels:collapsed");

    if (layout) {
      try {
        setDefaultLayout(JSON.parse(layout));
      } catch (e) {
        console.error("Invalid layout cookie:", layout);
      }
    }

    if (collapsed) {
      try {
        setDefaultCollapsed(JSON.parse(collapsed));
      } catch (e) {
        console.error("Invalid collapsed cookie:", collapsed);
      }
    }
  }, []);

  return (
    <>
      <AuthenticatedLayout title="Mails">
        <Main>
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm">

            <div className="md:hidden">
              <img
                src="/examples/mail-dark.png"
                width={1280}
                height={727}
                alt="Mail"
                className="hidden dark:block"
              />
              <img
                src="/examples/mail-light.png"
                width={1280}
                height={727}
                alt="Mail"
                className="block dark:hidden"
              />
            </div>
            <div className="hidden flex-col md:flex">
              <Mail
                accounts={accounts}
                mails={mails}
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
              />
            </div>
          </div>
        </Main>
      </AuthenticatedLayout>
    </>
  )
}
