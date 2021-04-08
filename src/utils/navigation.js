const getNavigationItems = (isAuthenticated) => {

  const authLinkItems = [
    {id: 1, text: 'Products', href: '/products'},
    {id: 2, text: 'Contacts', href: '/contacts'},
    {id: 3, text: 'Add Product', href: '/products/add'},
    {id: 4, text: 'Cart', href: '/cart', image: <i class="fas fa-shopping-cart"></i>},
    {id: 5, text: 'LogOut', href: '/logout', image: <i class="fas fa-sign-out-alt"></i>}
  ];

  const guestLinkItems = [
    {id: 1, text: 'Products', href: '/products'},
    {id: 2, text: 'Contacts', href: '/contacts'},
    {id: 3, text: 'LogIn', href: '/login', image: <i class="fas fa-sign-in-alt"></i>},
  ];

  return isAuthenticated ? authLinkItems : guestLinkItems
}

export default getNavigationItems;