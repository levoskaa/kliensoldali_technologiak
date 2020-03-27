using System;
using System.Collections.Generic;
using System.Text;
using W9HL9H.Models;
using System.Linq;

namespace W9HL9H.Services
{
    public class TodoService
    {
        public static TodoService Instance { get; } = new TodoService();

        private Dictionary<int, TodoItem> items = new Dictionary<int, TodoItem>
        {
            { 0, new TodoItem { Description = "Nagybevásárlást elintézni", Title = "Bevásárlás" }},
            { 1, new TodoItem { Description = "Lemenni a tóhoz és horgászni egy jót", Title = "Horgászat" }}
        };
        protected TodoService() { }
        public void AddItem(string title, string description)
        {
            items.Add(items.Keys.Max() + 1, new TodoItem
            {
                Title = title,
                Description = description
            });
        }
        public TodoItem GetItem(int id)
        {
            return items[id];
        }
        public List<TodoItem> GetAll()
        {
            return items.Values.ToList();
        }
    }
}
