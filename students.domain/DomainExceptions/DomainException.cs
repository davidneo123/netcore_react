using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace students.domain.DomainExceptions
{
    [Serializable]
    public class DomainException  : Exception
    {
        public List<string> ErrorMessages { get; set; }

        public override string Message
        {
            get
            {
                return this.ErrorMessages.Count > 0 ? this.ErrorMessages[0] : string.Empty;
            }
        }

        public DomainException()
        {
            this.ErrorMessages = new List<string>();
        }

        public DomainException(List<string> messages)
        {
            this.ErrorMessages = messages;
        }

        public DomainException(string message, System.Exception inner)
          : base(message, inner)
        {
        }

        protected DomainException(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {
        }
    }
}
