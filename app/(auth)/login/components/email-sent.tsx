import { CardContent } from "@/components/ui/card";

interface EmailSentProps {
  onBackToLogin: () => void;
}

export function EmailSent({ onBackToLogin }: EmailSentProps) {
  return (
    <CardContent className="flex flex-col items-center m-0 p-0 ">
      <a
        href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary text-base font-normal underline"
      >
        Check email inbox
      </a>
    </CardContent>
  );
}
