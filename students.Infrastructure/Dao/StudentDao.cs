using System.ComponentModel.DataAnnotations.Schema;

namespace students.infrastructure.Dao
{
    public class StudentDao
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int? Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string Career { get; set; }
    }
}
