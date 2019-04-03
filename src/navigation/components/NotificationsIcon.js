import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import { getNotifications } from "@/screens/NotificationsScreen/selectors/notifications.selectors";
import TabBarIcon from "@/components/TabBarIcon";

class NotificationsIcon extends PureComponent {
  render() {
    return (
      <TabBarIcon
        name="bell"
        size={28}
        focused={this.props.focused}
        badgeData={this.props.notificationsLength}
      />
    );
  }
}

const mapStateToProps = state => {
  const notifications = getNotifications(state);
  return {
    notificationsLength: !isEmpty(notifications.data)
      ? notifications.data.length
      : 0
  };
};

export default connect(mapStateToProps)(NotificationsIcon);
