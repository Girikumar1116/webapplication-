using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ProductsController(ProductDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
      
        public async Task<ActionResult<IEnumerable<Products>>> GetProduct(int page=1,int pageResults=10)
        {
            if (_context.Product == null)
            {
                return NotFound();
            }
           
            var pagecount = (int)Math.Ceiling((decimal)_context.Product.Count() / pageResults);
            var products=await _context.Product
                .Skip((page-1)*(int)pageResults)
                .Take((int)pageResults)
                .ToListAsync();

            return Ok(products);
        }
        
        //public ActionResult<IEnumerable<Products>> GetProduct()
        //{
        //    var pagedProducts = _context.Product.ToListAsync();
        //    return Ok(pagedProducts);
        //}


        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
          if (_context.Product == null)
          {
              return NotFound();
          }
            var products = await _context.Product.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }
       






        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.product_id)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
          if (_context.Product == null)
          {
              return Problem("Entity set 'ProductDbContext.Product'  is null.");
          }
            _context.Product.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.product_id }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts(int id)
        {
            if (_context.Product == null)
            {
                return NotFound();
            }
            var products = await _context.Product.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Product.Remove(products);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductsExists(int id)
        {
            return (_context.Product?.Any(e => e.product_id == id)).GetValueOrDefault();
        }
    }
}
