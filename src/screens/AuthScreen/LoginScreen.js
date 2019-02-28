import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { View } from 'react-native';
// import { EMITTER_EVENTS, emitter } from '@/helpers/emitter';

import { loginUser } from '@/actions/auth.actions';
import { getUserData } from '@/selectors/user.selectors';

import Input from '@/components/Input/Input';
import { Button } from '@/components/Buttons';

class LoginScreen extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user.logged !== this.props.user.logged && nextProps.user.logged) {
      this.props.navigation.navigate('HomeScreen');
    }
  }

  onSubmit = async values => {
    this.props.loginUser(values);
  };

  renderInput = ({ input, label, type, meta, secureTextEntry }) => {
    return <Input {...input} secureTextEntry={secureTextEntry} />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10 }}>
          <Field name="email" component={this.renderInput} placeholder="adres e-mail" />
          <Field name="password" component={this.renderInput} secureTextEntry placeholder="hasło" />
        </View>
        <View style={{ flex: 1, marginTop: 30, alignSelf: 'center', width: '60%' }}>
          <Button title="Zaloguj się" wide onPress={this.props.handleSubmit(this.onSubmit)} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getUserData(state),
  };
};

const mapDispatchToProps = {
  loginUser,
};

export default reduxForm({
  form: 'loginForm',
  initialValues: {
    email: 'kamil@kamil.pl',
    password: 'kamilo',
  },
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreen)
);
