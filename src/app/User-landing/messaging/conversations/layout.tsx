import React from "react";
import ItemList from "@/components/shared/item-list/itemList";
type Props = React.PropsWithChildren<{}>;

const ConversationsLayout = ({ children }: Props) => {
  return (
    <>
      {/* <ItemList title='Conversations'></ItemList> */}
      {children}
    </>
  );
};

export default ConversationsLayout;
