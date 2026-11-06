enum HTTP_METHOD {
  // Requests using GET should only retrieve data and should not contain a request content.
  GET = "GET",

  // submits an entity to the specified resource, often causing a change in state or side effects on the server.
  POST = "POST",

  // replaces all current representations of the target resource with the request content.
  PUT = "PUT",

  // applies partial modifications to a resource.
  PATCH = "PATCH",

  // deletes the specified resource.
  DELETE = "DELETE",

  // identical to a GET request, but without a response body.
  HEAD = "HEAD",

  // establishes a tunnel to the server identified by the target resource.
  CONNECT = "CONNECT",

  // describes the communication options for the target resource.
  OPTIONS = "OPTIONS",

  // performs a message loop-back test along the path to the target resource.
  TRACE = "TRACE",
}
export default HTTP_METHOD;
