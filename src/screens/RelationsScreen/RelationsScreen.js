import React, { Component } from "react";
import { connect } from "react-redux";

import { ScreenContainer } from "@/components/ScreenContainer";
import { Header, HeaderTitle } from "@/components/Header/HeaderNew";

import { getUserData } from "@/selectors/user.selectors";

class RelationsScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    image: null
  };

  render() {
    const {
      userData: { data },
      navigation: { goBack }
    } = this.props;

    return (
      <ScreenContainer>
        <Header>
          <HeaderTitle value="Users stories" color="#ffffff" />
        </Header>
      </ScreenContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: getUserData(state)
  };
};

export default connect(mapStateToProps)(RelationsScreen);
