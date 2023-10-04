function createdAt() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const createdAt = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;
  return createdAt;
}

function updatedAt() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const updatedAt = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;
  return updatedAt;
}

function deletedAt() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  const deletedAt = `${yyyy}-${mm}-${dd} ${hour}:${min}:${sec}`;
  return deletedAt;
}

module.exports = { createdAt, updatedAt, deletedAt };
