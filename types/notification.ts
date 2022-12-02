export type NotificationProps = {
    type: string;
    message: string;
    description: string | undefined;
    txid: string | undefined;
    onHide: () => void;
  }