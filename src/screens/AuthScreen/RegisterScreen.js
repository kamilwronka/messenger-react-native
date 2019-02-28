import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import Input from '@/components/Input/Input';
import { Button } from '@/components/Buttons';

import { registerUser } from '@/actions/auth.actions';
import { getUserData } from '@/selectors/user.selectors';

class RegisterScreen extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.logged !== this.props.user.logged && nextProps.user.logged) {
      this.props.navigation.navigate('HomeScreen');
    }
  }

  onSubmit = values => {
    this.props.registerUser(values);
  };

  renderInput = ({ input, label, type, meta, secureTextEntry }) => {
    return <Input {...input} secureTextEntry={secureTextEntry} />;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginHorizontal: 10 }}>
          <Field name="username" placeholder="nazwa użytkownika" component={this.renderInput} />
          <Field name="email" placeholder="adres e-mail" component={this.renderInput} />
          <Field name="password" placeholder="hasło" component={this.renderInput} secureTextEntry />
          <Field
            name="passwordConfirmation"
            placeholder="powtórz hasło"
            component={this.renderInput}
            secureTextEntry
          />
        </View>
        <View style={{ flex: 1, marginTop: 30, alignSelf: 'center', width: '60%' }}>
          <Button title="Zarejestruj się" wide onPress={this.props.handleSubmit(this.onSubmit)} />
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
  registerUser,
};

export default reduxForm({
  form: 'registerForm',
  initialValues: {
    email: 'kamil@kamil.pl',
    password: 'kamilo',
  },
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RegisterScreen)
);
