using Microsoft.AspNetCore.SignalR;
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
            //join group
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            // Send pizza price for this choice
            int price = _pizzaManager.PIZZA_PRICES[(int)choice];
            await Clients.Caller.SendAsync("UpdatePizzaPrice", price);

            // Send current number of pizzas and money for this pizza group
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            int money = _pizzaManager.Money[(int)choice];
            await Clients.Caller.SendAsync("UpdateNbPizzasAndMoney", nbPizzas, money);
        }

        public async Task UnselectChoice(PizzaChoice choice)
        {
            string groupName = _pizzaManager.GetGroupName(choice);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task AddMoney(PizzaChoice choice)
        {
            _pizzaManager.IncreaseMoney(choice);
            int money = _pizzaManager.Money[(int)choice];
            //ENVOYER POUR SEULEMENT CE GROUPE
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("UpdateMoney", money);

        }

        public async Task BuyPizza(PizzaChoice choice)
        {
            _pizzaManager.BuyPizza(choice);
            int money = _pizzaManager.Money[(int)choice];
            int pizzaPrice = _pizzaManager.PIZZA_PRICES[(int)choice];
            int nbPizzas = _pizzaManager.NbPizzas[(int)choice];
            await Clients.Group(_pizzaManager.GetGroupName(choice)).SendAsync("UpdateNbPizzasAndMoney",nbPizzas, money);
        }
    }
}
