using System.Collections.Generic;

namespace Logica
{
    public class Request<G>
    {
        public G Item { get; set; }
        public string Message { get; set; }
        public bool Error { get; set; }

        public Request(G item, string message, bool error)
        {
            Item = item;
            Message = message;
            Error = error;
        }
        public Request(G elemento) {
            Item = elemento;
        }
        public Request() { }
    }

    public class QueryRequest<G>
    {
        public IList<G> Items { get; set; }
        public string Message { get; set; }
        public bool Error { get; set; }

        public QueryRequest(IList<G> items, string message, bool error) {
            Items = items;
            Message = message;
            Error = error;
        }
        public QueryRequest() { }
    }
}