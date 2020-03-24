import React, { Component } from "react";
import H1 from 'components/H1'

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error:null };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true ,error: error};
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <H1>{this.state.error.toString()}</H1>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary