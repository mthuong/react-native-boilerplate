import React from "react";

type LoadingState = "pending" | "rejected" | "fulfilled";

export interface PromiseCase {
  ["pending"]?: () => React.ReactNode
  ["rejected"]?: (exception?: any) => React.ReactNode
  ["fulfilled"]: (result: any) => React.ReactNode
}

interface Props {
  promise: Promise<any>
  cases: () => PromiseCase
}

interface State {
  loadState: LoadingState
  result: any
}

export default class PromiseView extends React.Component<Props, State> {

  state: State = {
    loadState: "pending",
    result: null
  }

  componentDidMount() {
    this.runPromise(this.props.promise)
  }

  componentWillReceiveProps(props: Props) {
    this.runPromise(props.promise)
  }

  async runPromise(promise: Promise<any>) {
    try {
      this.setState({ loadState: "pending" });
      const result = await promise;
      this.setState({
        loadState: "fulfilled",
        result
      });
    } catch (err) {
      this.setState({ loadState: "rejected" });
    }
  }

  render() {
    const { loadState, result } = this.state;
    const { pending, rejected, fulfilled } = this.props.cases();

    switch (loadState) {
      case "pending": return pending && pending();
      case "rejected": return rejected && rejected();
      default: return fulfilled(result);
    }
  }
}