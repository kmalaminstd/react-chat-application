import React from 'react'

function Search() {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find user" />
      </div>
      <div className="userChat">
        <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="" />
        <div className="userChatInfo">
          <span>Jene</span>
        </div>
      </div>
    </div>
  )
}

export default Search