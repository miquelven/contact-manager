const LocationItem = ({ label, value }) => (
  <li className="flex items-center gap-3">
    <h4 className="font-medium text-lg max-sm:text-base">{label}:</h4>
    {value ? (
      <span className="text-light">{value}</span>
    ) : (
      <span className="text-light">Não há dados salvos</span>
    )}
  </li>
);

export default function FormLocation({ data }) {
  const locationData = data[0] || {};

  return (
    <ul className="flex flex-col gap-4">
      <LocationItem label="Cidade" value={locationData.city} />
      <LocationItem label="Rua" value={locationData.street} />
      <LocationItem label="Bairro" value={locationData.neighborhood} />
      <LocationItem label="Número" value={locationData.number} />
      <LocationItem label="CEP" value={locationData.zipCode} />
    </ul>
  );
}
