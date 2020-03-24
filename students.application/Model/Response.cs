namespace students.application.Model
{
    public class Response<TResponse> where  TResponse : class
    {
        public TResponse Object { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }

        public int Code { get; set; }

    }
}
