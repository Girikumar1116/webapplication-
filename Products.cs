using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class Products
    {
        [Key]
        public int product_id { get; set; }
        
        public string product_name { get; set;}
        [DataType(DataType.MultilineText)]
        public string product_description { get; set;}
        public string product_price { get; set;}


        public string product_type { get; set;}
        public string product_url { get; set;}
        
        public DateTime? ProductExpiryDate { get; set;}
       

    }
}
