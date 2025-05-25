import { useState } from 'react';

const districts = [
  "Ahuntsic-Cartierville",
  "Anjou",
  "Côte-des-Neiges–Notre-Dame-de-Grâce",
  "L'Île-Bizard–Sainte-Geneviève",
  "Lachine",
  "LaSalle",
  "Le Plateau-Mont-Royal",
  "Le Sud-Ouest",
  "Mercier–Hochelaga-Maisonneuve",
  "Montréal-Nord",
  "Outremont",
  "Pierrefonds-Roxboro",
  "Rivière-des-Prairies–Pointe-aux-Trembles",
  "Rosemont–La Petite-Patrie",
  "Saint-Laurent",
  "Saint-Léonard",
  "Verdun",
  "Ville-Marie",
  "Villeray–Saint-Michel–Parc-Extension"
];

const subjects = [
  "Circulation et transport",
  "Complexes sportifs",
  "Déchets et recyclage",
  "Déneigement",
  "Eau et aqueduc",
  "Parcs et bâtiments municipaux",
  "Séances publiques",
  "Stationnement",
  "Urgence"
];

function SubscriptionModal({ onClose, isSubscribed, onSubscribe, onUnsubscribe, preferences, setPreferences }) {

  const [showDistricts, setShowDistricts] = useState(false);
  const [showSubjects, setShowSubjects] = useState(false);

  const toggleSelection = (type, value) => {
    setPreferences(prev => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value) ? list.filter(item => item !== value) : [...list, value]
      };
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Gérer mes abonnements</h2>
        <p>"Vous recevrez une alerte lorsque de nouveaux contenus seront disponibles."</p>

        <div className="subscription-options">
          <div>
            <label><strong>Arrondissements :</strong></label>
            <div className='dropdown' onClick={() => setShowDistricts(!showDistricts)}>
              {preferences.district.length > 0 ? preferences.district.join(', ') : 'Sélectionner...'}
            </div>
            {showDistricts && (
              <div className='dropdown-menu'>
                {districts.map(district => (
                  <label key={district} className='checkbox-option'>
                    <input
                      type="checkbox"
                      checked={preferences.district.includes(district)}
                      onChange={() => toggleSelection('district', district)}
                    />
                    {district}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <label><strong>Sujets :</strong></label>
            <div className='dropdown' onClick={() => setShowSubjects(!showSubjects)}>
              {preferences.subject.length > 0 ? preferences.subject.join(', ') : 'Sélectionner...'}
            </div>
            {showSubjects && (
              <div className='dropdown-menu'>
                {subjects.map(subject => (
                  <label key={subject} className='checkbox-option'>
                    <input
                      type="checkbox"
                      checked={preferences.subject.includes(subject)}
                      onChange={() => toggleSelection('subject', subject)}
                    />
                    {subject}
                  </label>
                ))}
              </div>
            )}
          </div>

          {isSubscribed ? (
            <button onClick={onUnsubscribe}>Se désabonner</button>
          ) : (
            <button onClick={onSubscribe}>S'abonner</button>
          )}
          <button onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionModal;