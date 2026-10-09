// Each destination has a name, description and image.
const recommendations = {
  beaches: [
    {
      name: "Bora Bora, French Polynesia",
      description:
        "Discover turquoise water, tropical scenery and a peaceful island atmosphere.",
      image:
        "https://images.unsplash.com/photo-1500930287596-c1ecaa373bb2?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Copacabana Beach, Brazil",
      description:
        "Enjoy a famous sandy beach and the lively coastal atmosphere of Rio de Janeiro.",
      image:
        "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
    }
  ],

  temples: [
    {
      name: "Angkor Wat, Cambodia",
      description:
        "Explore a historic temple complex known for its remarkable Khmer architecture.",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Kyoto Temples, Japan",
      description:
        "Discover traditional temples, peaceful gardens and Japan's cultural heritage.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    }
  ],

  australia: [
    {
      name: "Sydney, Australia",
      description:
        "Visit Sydney Harbour and discover the city's famous waterfront landmarks.",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Melbourne, Australia",
      description:
        "Explore a city celebrated for its arts, cafes and vibrant streets.",
      image:
        "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=800&q=80"
    }
  ],

  japan: [
    {
      name: "Tokyo, Japan",
      description:
        "Experience bright city lights, exciting neighborhoods and Japanese food.",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Kyoto, Japan",
      description:
        "Explore traditional streets, historic architecture and beautiful gardens.",
      image:
        "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
    }
  ],

  brazil: [
    {
      name: "Rio de Janeiro, Brazil",
      description:
        "Discover mountain views, beaches and a lively coastal city.",
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "São Paulo, Brazil",
      description:
        "Explore a large city with diverse food, museums and cultural attractions.",
      image:
        "https://images.unsplash.com/photo-1543059080-f9b1272213d5?auto=format&fit=crop&w=800&q=80"
    }
  ]
};

// Connect JavaScript to the elements in index.html.
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const clearButton = document.getElementById("clear-button");
const results = document.getElementById("results");

function showMessage(message) {
  const paragraph = document.createElement("p");
  paragraph.className = "results-message";
  paragraph.textContent = message;
  results.appendChild(paragraph);
}

function showDestination(destination) {
  const card = document.createElement("article");
  card.className = "card";

  const image = document.createElement("img");
  image.src = destination.image;
  image.alt = destination.name;
  image.loading = "lazy";

  const content = document.createElement("div");
  content.className = "card-content";

  const title = document.createElement("h2");
  title.textContent = destination.name;

  const description = document.createElement("p");
  description.textContent = destination.description;

  content.append(title, description);
  card.append(image, content);
  results.appendChild(card);
}

function searchDestinations(event) {
  event.preventDefault();
  results.replaceChildren();

  // Ignore capital letters and spaces around the keyword.
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword) {
    showMessage("Please enter a destination or keyword.");
    return;
  }

  let matches = [];

  if (["beach", "beaches"].includes(keyword)) {
    matches = recommendations.beaches;
  } else if (["temple", "temples"].includes(keyword)) {
    matches = recommendations.temples;
  } else if (["country", "countries"].includes(keyword)) {
    matches = [
      ...recommendations.australia,
      ...recommendations.japan,
      ...recommendations.brazil
    ];
  } else if (
    ["australia", "japan", "brazil"].includes(keyword)
  ) {
    matches = recommendations[keyword];
  } else {
    // Also allow searches for cities or destination names.
    matches = Object.values(recommendations)
      .flat()
      .filter(function (destination) {
        return destination.name.toLowerCase().includes(keyword);
      });
  }

  if (matches.length === 0) {
    showMessage(
      "No results found. Try beach, temple, Australia, Japan or Brazil."
    );
    return;
  }

  matches.forEach(showDestination);
}

searchForm.addEventListener("submit", searchDestinations);

clearButton.addEventListener("click", function () {
  searchInput.value = "";
  results.replaceChildren();
  searchInput.focus();
});
