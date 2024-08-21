const ErrorMessage = (props: { message: string }) => {
  const { message } = props;
  return <p className="text-md text-red-600">{message}</p>;
};

export default ErrorMessage;
