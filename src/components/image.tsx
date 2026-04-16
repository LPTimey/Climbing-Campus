export default function Image(
  params: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  return <img draggable="false" {...params} />;
}