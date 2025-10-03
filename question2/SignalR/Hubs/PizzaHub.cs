﻿using Microsoft.AspNetCore.SignalR;
using SignalR.Services;

namespace SignalR.Hubs
{
    public class PizzaHub : Hub
    {
        private readonly PizzaManager _pizzaManager;

        public PizzaHub(PizzaManager pizzaManager) {
            _pizzaManager = pizzaManager;
        }

        public override async Task OnConnectedAsync()
        {
            _pizzaManager.AddUser();
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
     

        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            _pizzaManager.RemoveUser();
            await Clients.All.SendAsync("UpdateNbUsers", _pizzaManager.NbConnectedUsers);
            await base.OnConnectedAsync();
        }

        public async Task SelectChoice(PizzaChoice choice)
        {
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
        }

        public async Task AddMoney(PizzaChoice choice)
        {
        }

        public async Task BuyPizza(PizzaChoice choice)
        {
        }
    }
}
