function Ad({ ad }) {
  return (
    <div className="  shadow-sm">
      <div dangerouslySetInnerHTML={{ __html: ad.code }} />
    </div>
  );
}

export default Ad;
